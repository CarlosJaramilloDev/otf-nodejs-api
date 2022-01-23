const express = require("express");
const hubspot = require('@hubspot/api-client');
const router = new express.Router();

const hubspotClient = new hubspot.Client({ "apiKey" : "4c6dcb6d-d46b-48d8-a26b-5677fc77c29c" });
const tableName = "developer_test";

// Get publish table rows
router.get("/users", async (req, res) => {
  try {
    const apiResponse = await hubspotClient.cms.hubdb.rowsApi.getTableRows(tableName)
    res.send({data: apiResponse.body});
  } catch (e) {
    e.message === 'HTTP request failed'
    ? res.status(e.response.statusCode).send({ message: e.response.body.message })
    : res.status(500).send({ message: e.message })
  }
});


// Get draft table rows
router.get("/users/draft", async (req, res) => {
  try {
    const apiResponse = await hubspotClient.cms.hubdb.rowsApi.readDraftTableRows(tableName)
    res.send({data: apiResponse.body});
  } catch (e) {
    e.message === 'HTTP request failed'
    ? res.status(e.response.statusCode).send({ message: e.response.body.message })
    : res.status(500).send({ message: e.message })
  }
});


// Get publish user by id
router.get("/users/:id", async (req, res) => {
  try {
    const apiResponse = await hubspotClient.cms.hubdb.rowsApi.getTableRow(tableName, req.params.id)    
    res.send({data: apiResponse.body});
  } catch (e) {
    e.message === 'HTTP request failed'
    ? res.status(e.response.statusCode).send({ message: e.response.body.message })
    : res.status(500).send({ message: e.message })
  }
});


// Get draft user by id
router.get("/users/draft/:id", async (req, res) => {
  try {
    const apiResponse = await hubspotClient.cms.hubdb.rowsApi.getDraftTableRowById(tableName, req.params.id)    
    res.send({data: apiResponse.body});
  } catch (e) {
    e.message === 'HTTP request failed'
    ? res.status(e.response.statusCode).send({ message: e.response.body.message })
    : res.status(500).send({ message: e.message })
  }
});

// Add new user to draft table
router.post("/users", async (req, res) => {
  try {
    if(req.body.name && req.body.last_name && req.body.document_id){
      const values = {
        "name": req.body.name,
        "last_name": req.body.last_name,
        "document_id": req.body.document_id,
      };
      const apiResponse = await hubspotClient.cms.hubdb.rowsApi.createTableRow(tableName, { values })   
      res.send({data: apiResponse.body});
    } else {
      res.status(400).send({ message: 'Name, Last name and Document ID are required' })
    }
  } catch (e) {
    e.message === 'HTTP request failed'
    ? res.status(e.response.statusCode).send({ message: e.response.body.message })
    : res.status(500).send({ message: e.message })
  }
});
  


module.exports = router;
