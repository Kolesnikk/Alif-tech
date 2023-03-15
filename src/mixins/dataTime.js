export function sortDate(arr, key) {
  return arr.sort((a, b) => {
    return new Date(b[key]) - new Date(a[key]);
  });
}
export default {
  computed: {
    parseDate() {
      return (code) =>
        new Date(code).toLocaleString({
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        });
    },
  },
};
