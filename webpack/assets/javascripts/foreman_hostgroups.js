import $ from 'jquery';

export function checkForUnavailablePuppetclasses() {
  let unavailableClasses = $('#puppet_klasses #selected_classes .unavailable');
  let helpBlock = $('#puppet_klasses').closest('form')
                     .find('#hostgroup_environment_id')
                     .closest('.form-group').find('div+.help-block');

  if (unavailableClasses.size() > 0) {
    let warningMessage = Jed.sprintf(__('Some %s are unavailable in the selected environment'),
                              '<a href="#puppet_klasses">Puppet Classes</a>');
    let warning = `<span id="puppetclasses_unavaliable_warning">
        <span class="pficon pficon-warning-triangle-o"></span>
        ${warningMessage}
      </span>`;

    helpBlock.append(warning).find('a').on('click', function (event) {
      event.preventDefault();
      let tab = $(event.target).closest('form').find('.nav-tabs a[href="#puppet_klasses"]');

      tab.tab('show');
    });
  } else {
    helpBlock.find('#puppetclasses_unavaliable_warning').remove();
  }
}

