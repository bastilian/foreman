jest.unmock('./foreman_hostgroups');
const hostgroups = require('./foreman_hostgroups');
const $ = require('jquery');

describe('check_for_unavailable_puppetclasses', () => {
  beforeEach(() => {
    window.Jed = { sprintf: function (input) { return input; } }
    window.__ = function (input) { return input; };

    document.body.innerHTML =
      `<div>
        <ul class="nav-tabs">
          <li><a href="#puppet_klasses" data-toggle="tab">Puppet Classes</a></li>
        </ul>
        <div class="tab-content">
          <form>
            <div class="tab-pane active" id="hostgroup">
                <div class="form-group">
                  <div>
                    <input id="hostgroup_environment_id"/>
                  </div>
                  <span class="help-block"></span>
                </div>
            </div>
            <div class="tab-pane" id="puppet_klasses">
              <div id="selected_classes"></div>
            </div>
          </form>
        </div>
      </div>`
  });

  it('adds a warning if an unavailable class is found', () => {
    $('#selected_classes').append('<li class="unavailable">Unavailable Class</li>');

    hostgroups.check_for_unavailable_puppetclasses();
    expect($('#hostgroup .help-block').first().children().size()).toBe(1);
  });

  it('does not add a warning if no unavailable classes are found', () => {
    $('#hostgroup .help-block').empty();
    $('#selected_classes').empty();

    hostgroups.check_for_unavailable_puppetclasses();
    expect($('#hostgroup .help-block').first().children().size()).toBe(0)
  });
})
