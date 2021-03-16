
module.exports = class notekeeper {
  async initialize(config) {}

  // JSX code to be displayed.
  async render() {
    return (
      <div class="card mt-2 shadow text-center">
        <div class="card-header">Note</div>
        <textarea id="note_keeper" placeholder="Your thoughts?" size="50" rows="8"></textarea>
      </div>
    );
  }

  // All logic can be added  here
  async script() {
    const data = window.localStorage.getItem("note_keeper");

    if (data)
      window.document.getElementById("note_keeper").value = data;

    document.getElementById("note_keeper").addEventListener("input", (event) => {

      window.localStorage.setItem("note_keeper", event.target.value);
    });
  }
};
