import $ from 'jquery';

export function check_for_unavailable_puppetclasses() {
  var unavailable_classes = $('#puppet_klasses #selected_classes .unavailable');
  var help_block = $('#puppet_klasses').closest('form')
                     .find('#hostgroup_environment_id')
                     .closest('.form-group').find('div+.help-block');

  if (unavailable_classes.size() > 0) {
    var warning = '<span id="puppetclasses_unavaliable_warning"><span class="pficon pficon-warning-triangle-o"></span> ' +
                  Jed.sprintf(__('Some %s are unavailable in the selected environment'),
                              '<a href="#puppet_klasses">Puppet Classes</a>') + '</span>';

    help_block.append(warning).find('a').on('click', function (event) {
      event.preventDefault();
      var tab = $(event.target).closest('form').find('.nav-tabs a[href="#puppet_klasses"]');
      tab.tab('show')
    })
  } else {
    help_block.find('#puppetclasses_unavaliable_warning').remove();
  }
}

