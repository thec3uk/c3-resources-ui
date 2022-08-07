// const config = require(`../config/site`);

// const domainPrefix = `${config.domain}_`;
const domain = `thec3.uk`;
const domainPrefix = `${domain}_`;

exports.linkResolver = (node) => {
  // if (node.type === 'page' && node.data) {
  //   console.log('Page with data')
  //   console.log(node)
  //   const fullPath =
  //     node.data.parent_page.url === null
  //       ? node.uid === 'home'
  //         ? '/'
  //         : `/${node.uid}`
  //       : `${node.data.parent_page.uid}/${node.uid}`
  //   return fullPath
  // })
  if (node.__typename === "Page") {
    // console.log('Page without data')
    // console.log(node)
    if (node._meta.uid.startsWith(domainPrefix)) {
      const slug = node._meta.uid.replace(domainPrefix, "");
      return `/${slug}`;
    }
    if (node._meta.uid === domain) return "/";
    return `/${node.uid}`;
  }
  if (node.__typename === "Redirect") {
    // console.log('Page without data')
    // console.log(node)
    return `/${node._meta.uid}`;
  }
  if (node.__typename === "_ExternalLink") {
    // console.log('Page without data')
    // console.log(node)
    return node.url;
  }

  return "/";
};
