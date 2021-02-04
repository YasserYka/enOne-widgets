const indeed_scraper = require('indeed-scraper');

module.exports = class IndeedJobs {
  async initialize() {}

  async render() {
    return (
      <div class="card">
        <div class="card-header">
          <a target="_blank" href="https://github.com/rynobax/indeed-scraper" class="text-white card-link">
            Indeed Scraper
          </a>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-borderless table-sm table-dark">
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
        <div class="card-footer text-white">Jobs in last 24H</div>
      </div>
    );
  }

  async script() {
    this.renderJobs();

    setInterval(this.renderJobs, 1800000 /*  30 minutes in milliseconds */);
  }

  renderJobs() {
    indeed_scraper
      .query({
        host: "www.indeed.com",
        query: "Software",
        city: "Seattle, WA",
        radius: "25",
        level: "entry_level",
        jobType: "fulltime",
        maxAge: "7",
        sort: "date",
        limit: 8,
      })
      .then((jobs) => {
        document.getElementById("jobs-row").innerHTML = jobs.map(job => 
            <tr href={job.url}>
                <td><a href={job.url}>{job.title}</a></td> <td><a href={job.url}>{job.company}</a></td> <td><a href={job.url}>{job.postDate}</a></td>
            </tr>
        ).join(" ");
      });
  }
};
