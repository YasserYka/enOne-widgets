const indeed_scraper = require('indeed-scraper');

module.exports = class IndeedJobs {
  async initialize(config) {}

  async render() {
    return (
      <div class="card">
        <div class="card-header">
          <a target="_blank" href="https://github.com/rynobax/indeed-scraper" class="card-link">
            Indeed Scraper
          </a>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-borderless table-sm">
              <thead>
                <tr>
                  <th scope="col">title</th> <th scope="col">company</th> <th scope="col">post date</th>
                </tr>
              </thead>
              <tbody id="jobs-row">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  async script() {
    this.renderJobs();

    setInterval(this.renderJobs, 1800000 /*  30 minutes in milliseconds */);
  }

  renderJobs() {
    const jobsTable = document.getElementById("jobs-row");
	
    indeed_scraper
      .query({
        host: "sa.indeed.com",
        query: "Developer",
        city: "Riyadh, SA",
        sort: "date",
        limit: 8,
      })
      .then((jobs) => {

	jobsTable.innerHTML = "";

        jobs.forEach(job => 
		
            jobsTable.appendChild(
            <tr href={job.url}>
                <td><a target="_blank" href={job.url}>{job.title}</a></td> <td><a href={job.url}>{job.company}</a></td> <td><a href={job.url}>{job.postDate}</a></td>
            </tr>
        ));
      });
  }
};
