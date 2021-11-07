 class Github {
                constructor() {
                    this.client_id ='69d49a6084533b4f783';
                    this.client_secret ='7e761c5720e95376d0dd663a65ed340da2c01dbe';
                    this.repos_count = 5;
                    this.repos_sort = 'created: asc';
                }

                async getUser(user) {
                    const profileResponse = await fetch(`
        https://api.github.com/users/${user}?
        client_id=${this.client_id}&
        client_secret=${this.client_secret}`);

                    const repoResponse = await fetch(`
        https://api.github.com/users/${user}
        /repos?per_page=${this.repos_count}&
        sort=${user.repos_sort}&
        client_id=${this.client_id}&
        client_secret=${this.client_secret}`);

                    const profile = await profileResponse.json()
                    const repos = await repoResponse.json()

                    return {
                        profile,
                        repos
                    }
                }
            }