const moment = require("moment");

module.exports = {
  formatDate: function (date, format) {
    return moment.utc(date).format(format);
  },
  truncate: function (str, len) {
    if (str.length > len && str.length > 0) {
      let new_str = str + " ";
      new_str = str.substr(0, len);
      new_str = str.substr(0, new_str.lastIndexOf(" "));
      new_str = new_str.length > 0 ? new_str : str.substr(0, len);
      return new_str + "...";
    }
    return str;
  },
  stripTags: function (input) {
    let spaceStrip = input.replace();
    return input.replace(/<(?:.|\n)*?>|(\&nbsp;)/gm, "");
  },
  editIcon: function (
    itemUser,
    loggedUser,
    itemId,
    floating = true,
    flat = true,
    type
  ) {
    if (itemUser._id.toString() == loggedUser._id.toString()) {
      if (floating && type === "band") {
        return `<a href="/bands/edit/${itemId}" class="btn-floating halfway-fab blue">
        <i class="fas fa-edit fa-small"></i></a>`;
      } else if (flat && type === "band") {
        return `<a href="/bands/edit/${itemId}"><i class="fas fa-edit"></i></a>`;
      } else if (floating && type === "venue") {
        return `<a href="/venues/edit/${itemId}" class="btn-floating halfway-fab blue">
        <i class="fas fa-edit fa-small"></i></a>`;
      } else if (flat && type === "venue") {
        return `<a href="/venues/edit/${itemId}"><i class="fas fa-edit"></i></a>`;
      } else if (flat && type === "image") {
        return ``;
      } else if (!flat && !floating && type === "venue") {
        return `<a href="/venues/edit/${itemId}" class="btn waves-effect"><i class="fas fa-edit"></i></a>`;
      } else if (!flat && !floating && type === "band") {
        return `<a href="/bands/edit/${itemId}" class="btn waves-effect"><i class="fas fa-edit"></i></a>`;
      }
    } else {
      return "";
    }
  },

  deleteIcon: function (itemUser, loggedUser, itemId, type) {
    if (itemUser._id.toString() == loggedUser._id.toString()) {
      return `<form action="/${type}s/${itemId}" method="POST" id="delete-form">
      <input type="hidden" name="_method" value="DELETE" />
      <button type="submit" class="btn red">
        <i class="fas fa-trash"></i>
      </button>
    </form>`;
    }
  },

  profileEditIcon: function (ProfileUser, loggedUser) {
    if (ProfileUser._id.toString() == loggedUser._id.toString()) {
      return `<a
      href="/profile/edit_profile/${loggedUser}"
      class="btn-floating btn-large waves-effect waves-light blue">
      <i class="fas fa-edit fa-large"></i></a>`;
    }
  },

  select: function (selected, options) {
    return options
      .fn(this)
      .replace(
        new RegExp(' value="' + selected + '"'),
        '$& selected="selected"'
      )
      .replace(
        new RegExp(">" + selected + "</option>"),
        ' selected = "selected"$&'
      );
  },

  stripUrl: function (input) {
    let url = new URL(input);
    return url.hostname;
  },
  calculateAge: function calculateAge(birthDate, format) {
    let formattedBirthDate = moment.utc(birthDate).format(format);
    formattedBirthDate = new Date(birthDate);
    otherDate = new Date();
    var years = otherDate.getFullYear() - birthDate.getFullYear();

    if (
      otherDate.getMonth() < birthDate.getMonth() ||
      (otherDate.getMonth() == birthDate.getMonth() &&
        otherDate.getDate() < birthDate.getDate())
    ) {
      years--;
    }
    return years;
  },

  searchQuery: function (query) {
    return query.split(" ").join("%");
  },
};
