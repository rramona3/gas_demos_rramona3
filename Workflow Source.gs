function Workflow(){
  this.setTitle = function(newtitle){this.title = newtitle; return this;};
  this.getTitle = function(){return this.title;}; 

  this.setRequester = function(newRequester){this.requester = newRequester; return this;};
  this.getRequester = function(){return this.requester;};
  
  this.setStatus = function(newStatus){this.status = newStatus; return this;};
  this.getStatus = function(){return this.status;};  
  
  this.setNote = function(newNote){this.note = newNote; return this;};
  this.getNote = function(){return this.note;};
 
  this.steps = new Array();
  this.createStep = function(){this.steps.push(new Step()); return this.steps[this.steps.length-1];}; 
  this.getSteps = function(){return this.steps;}
  this.removeStep = function(pos){this.steps.splice(parseInt(pos), 1);}; 
  this.insertStep = function(pos){this.steps.splice(parseInt(pos),0, new Step()); return this.steps[parseInt(pos)];};
   
  this.attachments = new Array();
  this.addAttachment = function(){this.attachments.push(new Attachment()); return this.attachments[this.attachments.length-1];}; 
  this.getAttachments = function(){return this.attachments;};
  this.removeAttachment = function(pos){this.attachments.splice(parseInt(pos), 1);};  

  this.docsFolders = new Array();
  this.addDocsFolder = function(){this.docsFolders.push(new DocsFolder()); return this.docsFolders[this.docsFolders.length-1];}; 
  this.getDocsFolders = function(){return this.docsFolders;};
  this.removeDocsFolder = function(pos){this.docsFolders.splice(parseInt(pos), 1);}; 
  this.insertDocsFolder = function(pos){this.docsFolders.splice(parseInt(pos),0, new DocsFolder()); return this.docsFolders[parseInt(pos)];};  
  
  this.customItems = new Array();
  this.addCustomItem = function(){this.customItems.push(new CustomItem()); return this.customItems[this.customItems.length-1];}; 
  this.getCustomItems = function(){return this.customItems;};
  this.removeCustomItem = function(pos){this.customItems.splice(parseInt(pos), 1);};  
}
  
function Step(){      

  this.setTitle = function(newtitle){this.title = newtitle; return this;};
  this.getTitle = function(){return this.title;};      

  this.setStatus = function(newStatus){this.status = newStatus; return this;};
  this.getStatus = function(){return this.status;};
  
  this.setNote = function(newNote){this.note = newNote; return this;};
  this.getNote = function(){return this.note;};

  this.approvers = new Array();  
  this.addApprover = function(){this.approvers.push(new Approver()); return this.approvers[this.approvers.length-1];}; 
  this.getApprovers = function(){return this.approvers;}; //returns Array
  this.removeApprover = function(pos){this.approvers.splice(parseInt(pos), 1);}; // integer possition zero base
}

function Approver(){
  
  this.setName = function(newName){this.name = newName; return this;};
  this.getName = function(){return this.name;}; 
          
  this.setEmail = function(newEmail){this.email = newEmail; return this;};
  this.getEmail = function(){return this.email;}; 
          
  this.setApprovalStatus = function(newApprovalStatus){this.approvalStatus = newApprovalStatus; return this;};
  this.getApprovalStatus = function(){return this.approvalStatus;};          
} 

function Attachment(){
  
  this.setName = function(newName){this.name = newName; return this;};
  this.getName = function(){return this.name;}; 
          
  this.setUrl = function(newUrl){this.url = newUrl; return this;};
  this.getUrl = function(){return this.url;}; 
          
  this.setId = function(newId){this.iD = newId; return this;};
  this.getId = function(){return this.iD;};          
} 

function DocsFolder(){
  
  this.setName = function(newName){this.name = newName; return this;};
  this.getName = function(){return this.name;}; 
          
  this.setUrl = function(newUrl){this.url = newUrl; return this;};
  this.getUrl = function(){return this.url;}; 
          
  this.setId = function(newId){this.iD = newId; return this;};
  this.getId = function(){return this.iD;};          
} 

function CustomItem(){
  
  this.setName = function(newName){this.name = newName; return this;};
  this.getName = function(){return this.name;}; 
          
  this.setValue = function(newValue){this.value = newValue; return this;};
  this.getValue = function(){return this.value;};           
} 


function ReLoadJson(jsonText){
  var workflow = Utilities.jsonParse(jsonText);
  var workflowSteps = workflow.steps;
  var workflowAttachments = workflow.attachments;
  var workflowDocsFolders = workflow.docsFolders;  
  var workflowCustomeItems = workflow.customItems;  
  
  Workflow.call(workflow);

  workflow.steps = workflowSteps;
  for (var i in workflowSteps){
    var stepArray = workflowSteps[i].approvers;
    Step.call(workflow.steps[i]);    
    workflow.steps[i].approvers = stepArray;
      
    for (var j in workflow.steps[i].approvers){
      var approverArray = workflowSteps[i].approvers[j]; 
      Approver.call(workflowSteps[i].approvers[j]);
      workflowSteps[i].approvers[j] = approverArray;
    }      
  }

  workflow.attachments = workflowAttachments;  
  for (var i in workflowAttachments){
    var attachmentsArray = workflowAttachments[i];
    Attachment.call(workflow.attachments[i]);    
    workflow.attachments[i] = attachmentsArray;
  }
  
  workflow.docsFolders = workflowDocsFolders;  
  for (var i in workflowDocsFolders){
    var docsFolderArray = workflowDocsFolders[i];
    DocsFolder.call(workflow.docsFolders[i]);    
    workflow.docsFolders[i] = docsFolderArray;
  }
  
  workflow.customItems = workflowCustomeItems;    
  for (var i in workflowCustomeItems){
    var cItemsArray = workflowCustomeItems[i];
    CustomItem.call(workflow.customItems[i]);    
    workflow.customItems[i] = cItemsArray;
  }  
 
  
  return workflow;
}
