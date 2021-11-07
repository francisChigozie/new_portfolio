//Init Github
            const github = new Github;

            //Init UI
            const ui = new UI;

            //Search Input
            const searchUser = document.getElementById('searchUser')

            //Search Input Event
            searchUser.addEventListener('keyup', (e) => {
                e.preventDefault()

                //Get input text
                const userInput = e.target.value;

                if (userInput !== '') {
                    //Make http call
                    github.getUser(userInput)
                        .then(data => {
                            if (data.profile.message === 'Not Found') {
                                //Show alert
                                ui.showAlert('User not found', 'alert alert-danger')
                            } else {
                                //Show profile
                                ui.showProfile(data.profile)
                                ui.showRepos(data.repos)
                            }
                        })
                } else {
                    //Clear profile
                    ui.clearProfile()
                }

            })