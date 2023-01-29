const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    let total = 0;

    blogs.forEach(function (arrayItem) {
        total += arrayItem.likes;
    })

    return total;
}

const favoriteBlog = (blogs) => {
    let blog = null;

    blogs.forEach(function (arrayItem) {
        if(blog === null || blog === undefined || blog.likes < arrayItem.likes)
            blog = arrayItem;
    })

    return blog;
}

const mostBlogs = (blogs) => {
    const authorItems = [];

    blogs.forEach(function (arrayItem) {
        if (authorItems.length == 0 || authorItems.filter(x => x.author == arrayItem.author).length == 0) {
            let authorItem = {
                "author": arrayItem.author,
                "blogs": 1
            }

            authorItems.push(authorItem);
        } else {
            let authorItem = authorItems.filter(x => x.author == arrayItem.author)[0];
            authorItem.blogs += 1;
        }
    })

    const max = authorItems.reduce(function (prev, current) {
        return (prev.blogs > current.blogs) ? prev : current
    })

    return max;
}

const mostLikes = (blogs) => {
    const authorItems = [];

    blogs.forEach(function (arrayItem) {
        if (authorItems.length == 0 || authorItems.filter(x => x.author == arrayItem.author).length == 0) {
            let authorItem = {
                "author": arrayItem.author,
                "likes": arrayItem.likes
            }

            authorItems.push(authorItem);
        } else {
            let authorItem = authorItems.filter(x => x.author == arrayItem.author)[0];
            authorItem.likes += arrayItem.likes;            
        }
    })

    const max = authorItems.reduce(function (prev, current) {
        return (prev.likes > current.likes) ? prev : current
    })

    return max;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}