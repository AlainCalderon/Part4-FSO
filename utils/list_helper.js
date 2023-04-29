

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const total = blogs.reduce((curr, next) => curr + next.likes, 0);
  return total;
};

const favoriteBlog =(blogs) =>{
    const favorite = blogs.reduce((curr,next)=>{
    let output  = curr.likes > next.likes ? curr:next;
    return output
    })
    return favorite;

}
const deleteDbData = async () =>{



}

module.exports = { dummy, totalLikes, favoriteBlog };
