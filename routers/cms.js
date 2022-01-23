const express = require("express");
const hubspot = require('@hubspot/api-client');
const router = new express.Router();

const hubspotClient = new hubspot.Client({ "apiKey" : "4c6dcb6d-d46b-48d8-a26b-5677fc77c29c" });
const tableName = "developer_test";

// Get users
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

// Get user by id
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

module.exports = router;
