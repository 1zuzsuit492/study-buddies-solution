const db = require("../db/dbConfig.js");

const getAllGroups = async () => {
  try {
    const allGroups = await db.any("SELECT * FROM groups");
    return allGroups;
  } catch (error) {
    return error;
  }
};

const getAllGroupsByActiveStatus = async (activeStatus) => {
  try {
    const allGroups = await db.any("SELECT * FROM groups WHERE active=$1", [
      activeStatus,
    ]);
    return allGroups;
  } catch (error) {
    return error;
  }
}; 

const getGroup = async (id) => {
  try {
    const oneGroup = await db.one("SELECT * FROM groups WHERE id=$1", id);
    return oneGroup;
  } catch (error) {
    return error;
  }
}; //db.one => only one item being returned

const getGroupByFocus = async (searchParams) => {
  try {
    const foundGroups = await db.any(
      "SELECT * FROM groups WHERE main_focus LIKE '%$1:value%' ",
      [searchParams]
    );

    return foundGroups;
  } catch (error) {
    return error;
  }
};

const createGroup = async (group) => {
  try {
    const newGroup = await db.one(
      "INSERT INTO groups (name, main_focus, contact_email)  VALUES($1, $2, $3) RETURNING *",
      [group.name, group.main_focus, group.contact_email] //this is an arr because the db is an obj arr with keys and values
    );
    return newGroup;
  } catch (error) {
    return error;
  }
};//numbers present data types/rows in order, then returning *

const updateGroup = async (id, group) => {
  try {
    const updatedGroup = await db.one(
      "UPDATE groups SET name=$1, main_focus=$2, contact_email=$3 where id=$4 RETURNING *",
      [group.name, group.main_focus, group.contact_email, id]
    );
    return updatedGroup;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllGroups,
  getGroup,
  createGroup,
  updateGroup,
  getGroupByFocus,
  getAllGroupsByActiveStatus,
};
