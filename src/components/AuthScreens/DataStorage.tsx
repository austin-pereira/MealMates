import React from 'react';

//string return type is a hack fix to easily send JSON objects back and forth
//local storage is just to demonstrate functionality. in reality, this would use a server backend

//returns group ID
export function NewGroup(groupname:string, description:string, user:string): string { 
    let groupobject = JSON.parse(localStorage.getItem("groups") || '{}');

    //generate an ID for the new group
    let newid = getRandomInt(0,99999999999);
    while(newid.toString() in groupobject){
        newid = getRandomInt(0,99999999999); //eliminate the chance of two identical group IDs
    }
    groupobject[`${newid}`] = {"name" : `${groupname}`, "description" : `${description}`, "members" : [{"user" : `${user}`, "role" : "owner"}]};
    localStorage.setItem("groups", JSON.stringify(groupobject));
    return newid.toString();
}

export function GetGroup(groupid:string): string {
    let groupobject = JSON.parse(localStorage.getItem("groups") || '{}');
    return groupid in groupobject ? `{ "${groupid}" : ${JSON.stringify(groupobject[groupid])}}` : '{}';
}

//returns an array of group IDs for which the user is a member of
export function GetAllGroupIDsFromUser(user:string): string[] { //i need a drink.
    let groupobject = JSON.parse(localStorage.getItem("groups") || '{}');
    let groupsToReturn: string[] = [];
    let keys = Object.keys(groupobject);
    for (let i = 0; i < keys.length; i++){
        let key = keys[i];
        let group = groupobject[key];
        let groupmembers = group['members'];
        for (let j = 0; j < groupmembers.length; j++){
            let member = groupmembers[j];
            if(member['user'] == user){
                groupsToReturn.push(key);
                break;
            }
        }
    }
    return groupsToReturn;
}

//only the owner can delete a group
export function DeleteGroup(groupid:string, adminuser:string){
    let groupobject = JSON.parse(localStorage.getItem("groups") || '{}');
    if(groupid in groupobject){
        if(IsOwner(groupid,adminuser)){
            delete groupobject[groupid];
            localStorage.setItem("groups", JSON.stringify(groupobject));
        }
    }
}

export function AddUserToGroup(groupid:string, user:string, adminuser:string){
    let groupobject = JSON.parse(localStorage.getItem("groups") || '{}');
    if(groupid in groupobject){
        
    }
}

export function RemoveUserFromGroup(groupid:string, user:string, adminuser:string){
    let groupobject = JSON.parse(localStorage.getItem("groups") || '{}');
    if(groupid in groupobject){
        
    }
}

//oldowner must have the "owner" role, newowner must have an "admin" role
export function TransferOwnership(groupid:string, oldowner:string, newowner:string){
    let groupobject = JSON.parse(localStorage.getItem("groups") || '{}');
    if(groupid in groupobject){
        
    }
}

export function PromoteToAdmin(groupid:string, user:string, owner:string){
    let groupobject = JSON.parse(localStorage.getItem("groups") || '{}');
    if(groupid in groupobject){
        
    }
}

export function DemoteToMember(groupid:string, user:string, owner:string){
    let groupobject = JSON.parse(localStorage.getItem("groups") || '{}');
    if(groupid in groupobject){
        
    }
}

//utility functions

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//check if the user has admin permissions (owner or admin)
export function IsAdmin(groupid:string, user:string) : boolean {
    let groupobject = JSON.parse(localStorage.getItem("groups") || '{}');
    if(groupid in groupobject){
        let group = groupobject[groupid];
        let groupmembers = group['members'];
        for (let j = 0; j < groupmembers.length; j++){
            let member = groupmembers[j];
            if(member['user'] == user && (member['role'] == "owner" || member['role'] == "admin")){
                return true;
            }
        }
    }
    return false;
}

//check if a user is the owner of the group
export function IsOwner(groupid:string, user:string) : boolean {
    let groupobject = JSON.parse(localStorage.getItem("groups") || '{}');
    if(groupid in groupobject){
        let group = groupobject[groupid];
        let groupmembers = group['members'];
        for (let j = 0; j < groupmembers.length; j++){
            let member = groupmembers[j];
            if(member['user'] == user && member['role'] == "owner"){
                return true;
            }
        }
    }
    return false;
}

export function WipeLocalStorage(){
    localStorage.clear();
}

/*
group format:
{
    id : 
    {
        "name" : string
        "description" : string
        "members" : 
            [
                {
                "user": string
                "role" : member, admin, or owner
                }
            ]
        }
    }    
}

permissions:
member: TBD
Admin: can add or remove members from the group
Owner: admin permissions, can promote members to admin or demote admins to member, can delete group or transfer ownership to an admin
*/