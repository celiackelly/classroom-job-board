module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs', { title: 'Classroom Job Board' })
    },
    getAbout: (req,res)=>{
        res.render('about.ejs', { title: 'About' })
    }
}