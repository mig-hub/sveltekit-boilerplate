import contentfulClient from '$lib/contentfulClient';

export async function get() {

  // Set what needs to be loaded and replace the `content` var.
  const content = null;
  // const content = await contentfulClient.getEntries({
  //   // Add each new page to the call in layout as well
  //   'sys.contentType.sys.id[in]': 'homePage',
  //   include: 10,
  //   limit: 5,
  // });

  if (content) {

    let body = {};
    content.items.forEach( item => {
      body[item.sys.contentType.sys.id] = item;
    });

    return {
      status: 200,
      body: body,
    };
  }

  return {
    status: 404,
  };

}

