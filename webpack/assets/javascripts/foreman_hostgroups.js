import $ from 'jquery';

export function checkForUnavailablePuppetclasses() {
  let unavailableClasses = $('#puppet_klasses #selected_classes .unavailable');
  let puppetKlassesTab = $('#puppet_klasses');

  if (unavailableClasses.size() > 0) {
    let warningMessage = __('Some Puppet Classes are unavailable in the selected environment');
    let warning = `<div class="alert alert-warning" id="puppetclasses_unavaliable_warning">
        <span class="pficon pficon-warning-triangle-o"></span>
        ${warningMessage}
      </span>`;

    puppetKlassesTab.prepend(warning).find('a').on('click', function (event) {
      event.preventDefault();
      let tab = $(event.target).closest('form').find('.nav-tabs a[href="#puppet_klasses"]');

      tab.tab('show');
    });
  } else {
    puppetKlassesTab.find('#puppetclasses_unavaliable_warning').remove();
  }
}

