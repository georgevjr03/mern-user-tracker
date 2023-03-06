const router =require('express').Router();
let Contacts=require('../models/contact.model');

router.route('/').get((req,res)=>{
    Contacts.find()
        .then(contacts=>res.json(contacts))
        .catch(err=>res.status(400).json('Error:'+err));
});


router.route('/add').post((req,res)=>{
    const username = req.body.username;
    const number =Number(req.body.number);
    const description=req.body.description;
    const DOB =Date.parse(req.body.DOB);

    const newContacts =new Contacts({
        username,
        number,
        description,
        DOB,
    });

    newContacts.save()
        .then(()=> res.json('Contact added!'))
        .catch(err=>res.status(400).json('Error:'+err));

});

router.route('/:id').get((req,res)=>{
    Contacts.findById(req.params.id)
        .then(contacts=> res.json(contacts))
        .catch(err=>res.status(400).json('Error:'+err))

});

router.route('/:id').delete((req,res)=>{
    Contacts.findByIdAndDelete(req.params.id)
        .then(()=>res.json('Contact deleted.'))
        .catch(err=>res.status(400).json('Error:'+err))

});

router.route('/update/:id').post((req,res)=>{
    Contacts.findById(req.params.id)
        .then(contacts=>{
            contacts.username = req.body.username;
            contacts.number =Number(req.body.number);
            contacts.description=req.body.description;
            contacts.DOB =Date.parse(req.body.DOB);
            
            contacts.save()
                .then(()=> res.json('Contact updated!'))
                .catch(err=>res.status(400).json('Error:'+err));

        })
        .catch(err=>res.status(400).json('Error:'+err));
    
});
module.exports=router;