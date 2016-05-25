App.controller('InboxController', ['$scope', 'Inbox', function($scope, Inbox) {

	var self = this;
        
        self.mails=[];
        self.pages=['0'];
        self.index;
        self.error;

        
        self.setPage = function(where){

             if(where === "next"){
                //push the next page in pages array
                if(self.mails.nextPageToken) self.pages.push(self.mails.nextPageToken);
                
                //point the index on the current page
                self.index = self.pages.length - 2;
            }
            
            if(where === "previous"){

                if(self.index > 0){
                    //extract the array infos from index 0 to index
                    self.pages = self.pages.slice(0, self.index + 1);
                
                    //decrement the index to point the current page
                    self.index--;
                }
            }
            
            
        }
        
        //Get mails from the server and set the next page and the current page
        self.fetchEmails = function(page, where){
        	self.mails = Inbox.get({label:"INBOX", page:page}, function(){
                self.setPage(where);
                console.log("page : "+ self.index);
                console.log("pages : "+ self.pages);
            }, function(err){

                self.error = err;
            });
            
         };

        self.fetchEmails(undefined, "next");

        self.nextPage = function(page){
        	self.mails.length = 0;
        	self.fetchEmails(page, "next");
        }

        self.previousPage = function(page){
        	self.mails.length = 0;
            self.fetchEmails(self.pages[self.index - 1], "previous");
        	
        }
}]);