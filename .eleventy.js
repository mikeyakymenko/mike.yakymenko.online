// const dateFns = require('date-fns')
const { DateTime } = require("luxon")

module.exports = function(eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/sass/")

  eleventyConfig.addCollection('years', collection => {
    const posts = collection.getFilteredByGlob('src/blog/**/*.md')

    // DEBUG
    // const z = posts.map(item => {
    //   return {
    //     title: item.data.title,
    //     year: new Date(item.data.date).getFullYear(),
    //     url: item.inputPath,
    //     tags: item.data.tags
    //   }
    // })

    // z.forEach((item, index) => {
    //   console.log(item.tags, item.title, item.url, index)
    // })
    // DEBUG END

    // was stop on day planning

    const years = new Set(posts.map(item => new Date(item.data.date).getFullYear()))
    return Array.from(years)
  })

  eleventyConfig.addCollection('blog', collection => {
    return collection.getFilteredByGlob('src/blog/**/*.md')
  })

  eleventyConfig.addFilter('byYear', (postList, year) => {
    return postList.filter(post => {
      return new Date(post.data.date).getFullYear() == year
    })
  })

  eleventyConfig.addFilter('postDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd')
  })

  eleventyConfig.addFilter('postTime', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('HH:mm')
  })

  eleventyConfig.addFilter('homeList', array => array.reverse().slice(1, 6))

  return {
    dir: {
      input: 'src',
      output: 'public'
    }
  }
}