const useQparamsFilter = () => {
  const qParamsFilter = (url, arr) => {
    let newFilter;
    if (url.has("filter")) {
      let filter = url.get("filter");
      let rgx = new RegExp(filter, "i");
      newFilter = JSON.parse(JSON.stringify(arr));
      newFilter = newFilter.filter((item) => rgx.test(item.title));
    }
    if (url.has("sort")) {
      if (!newFilter) {
        newFilter = JSON.parse(JSON.stringify(arr));
      }
      let sort = url.get("sort");
      if (sort === "asc") {
        newFilter.sort();
      }
      if (sort === "desc") {
        newFilter.sort((a, b) =>
          a.title > b.title ? -1 : b.title > a.title ? 1 : 0
        );
      }
    }
    if (newFilter) {
      return newFilter;
    }
  };
  return qParamsFilter;
};

export default useQparamsFilter;
