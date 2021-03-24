module.exports = {
    TOKENS : {
        DISCORD : ''
    },
    MONGOOSE : {
        DBCONNECTION : 'mongodb+srv://hendrik:poepje000@cluster0.ybvrm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    },
    DEFAULTSETTINGS: {
        prefix: "!",
        logChannel: "733994085106581547",
        welcomeMessage: "welcome",
        rankcard: "",
        invitations : false, //Default anti-invitations status
        kickauto : false //Default kick-auto status
      },
    WEBHOOKS : {
        ERRORS : {
            ID : '',
            TOKEN : '',
            NAME : '',
            AVATAR : '',
        },
        CONSOLE : {
            ID : '',
            TOKEN : '',
            NAME : '',
            AVATAR : '',
        },
        CONNECTIONS : {
            MONGOOSE : {
                ID : '',
                TOKEN : '',
                NAME : '',
                AVATAR : '',
            },
            DISCORD : {
                ID : '',
                TOKEN : '',
                NAME : '',
                AVATAR : '',
            }
        },
    },
    ADMIN : {
        ORIGINPULL : '',
    }
};
