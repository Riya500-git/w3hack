const Project = require("../models/project");
const { ThirdwebStorage } = require("@thirdweb-dev/storage");

const mintToken = async (req, res) => {
    console.log("inside mintToken!")
    const { name, title, description, numOfTokens, price } = req.body;
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
        res.send(projectId)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

const fetchProjects = async (req, res) => {
    const { name } = req.body;

    let project = await Project.findOne({ name: name });
    if (!project) {
        res.status(400).send("Project Not Found!")
    }

    console.log(project)

    // console.log(projects);

    res.status(200).send(project)
}


module.exports = {
    mintToken,
    fetchProjects,
}
