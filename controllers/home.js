module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs', { title: 'Classroom Job Board' })
    }
}