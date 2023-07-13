const MarketPlace = require("../models/marketplace");
const Project = require("../models/project");
const User = require("../models/user");
const axios = require("axios");
const { ThirdwebStorage } = require("@thirdweb-dev/storage");

const addNdDeployProject = async (req, res) => {
    const { name, title, description, numOfTokens, price, email } = req.body;
    try {
        let createdDate = new Date();
        let project = new Project({
            name,
            title,
            description,
            createdDate,
            numOfTokens
        });
        const projectId = await project.save();
        const data = {
            "NFT_NAME": name,
            "NFT_SYMBOL": name,
            "PRICE_OF_ONE_BCO2_NFT_IN_WEI": price,
            "network": "fantom_testnet"
        }
        const url = "http://localhost:8000/deployMintNFTERC721";
        const response = await axios.post(url, data);
        console.log(response.data);
        projectId.smartContractAddress = response.data.MintNFTErc721;
        // projectId.smartContractAddress = "0x2D948E86c71d9b5bDcAb284707174B0F324B703B";

        await projectId.save();

        // call for nft storage via thirdweb 
        const metadata = {
            name,
            title,
            description,
            createdDate
        }
        const storage = new ThirdwebStorage();
        const uri = await storage.upload(metadata);
        console.info(uri);
        const urls = await storage.resolveScheme(uri);
        console.info(urls);
        projectId.BaseURI = urls;
        await projectId.save();

        let user = await User.findOne({ email: email });
        if (!user) {
            res.status(400).send("User not fouund!")
        }
        user = await User.findById(user._id)
        console.log(user)
        console.log(projectId._id.toString());
        // let projectOwned = [];
        user.projectOwned.push(projectId._id.toString());
        // user.projectOwned = projectOwned;
        await user.save()
        res.status(200).json({ projectId });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

}

const listProject = async (req, res) => {
    const { numOfTokens, email, projectId } = req.body;

    let project = await Project.findById(projectId);
    if (!project) {
        res.status(400).send("Project Id not found!")
    }
    let createdDate = new Date();

    const listData = {
        numOfTokens,
        createdDate
    }

    project.listedTokens.push(listData);
    await project.save();

    let marketPlace = new MarketPlace({
        name: project.name,
        title: project.title,
        description: project.description,
        createdDate,
        numOfTokens,
        smartContractAddress: project.smartContractAddress,
        projectId: projectId,
        tokenId: null
    })

    await marketPlace.save();

    res.status(200).send(project)
}

const fetchAvailableProjects = async (req, res) => {
    const { email } = req.body;

    let user = await User.findOne({ email: email });
    if (!user) {
        res.status(400).send("Project Not Found!")
    }

    console.log(user)

    const projectOwned = user.projectOwned;
    let projects = [];

    for (let i = 0; i < projectOwned.length; i++) {
        let project = await Project.findById(projectOwned[0]);
        projects.push(project);
    }

    console.log(projects);

    res.status(200).send(projects)
}

const fetchSmartContractAddress = async (req,res) => {
    const { projectId } = req.body;

    let user = await Project.findById(projectId);
    if(!user){
        res.send("not found")
    }
    console.log(user)
    res.send(user.smartContractAddress)
}

module.exports = {
    addNdDeployProject,
    listProject,
    fetchAvailableProjects,
    fetchSmartContractAddress
}
