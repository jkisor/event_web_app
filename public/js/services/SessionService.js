services.factory('SessionService', 
    function($cookieStore) {
        var currentUser = null;
        return {
            setCurrentUser: function(u) { currentUser = u; },
            currentUser: function() { return currentUser },
            token: function() { return $cookieStore.get('remember_token') },
            signIn: function(user) {
                currentUser = user;
                $cookieStore.put('remember_token', user.remember_token)
            },

            signOut: function() {
                $cookieStore.remove('remember_token')
                currentUser = null;
            }
        }
    }
);