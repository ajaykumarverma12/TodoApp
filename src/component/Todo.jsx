import React,{useState,useEffect} from 'react'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const getlocalItems = () => {
    let value=localStorage.getItem('item store')
    console.log(value);
    if(value){
        return JSON.parse(localStorage.getItem('item store')); 
    }
    else {
        return [];
    }
}
function Todo() {
    const[inputData,setInputData]= useState('');
    const [items,setItems]=useState(getlocalItems());
    const [toggle,SetToggle]=useState(true);
    const [value,setValue]=useState(null);
    const addItem = () => {
        if(!inputData){
            alert('please enter the value')
        }else if(inputData && !toggle){
            setItems(
                items.map((elem) => {
                    if(elem.id==value){
                        return{ ...elem,name:inputData}
                    }
                    return elem;

                })
            )
            SetToggle(true);
            setInputData('');
            setValue(null);

        }

        else{
            const updateData={id: new Date().getTime().toString(),name:inputData}
            setItems([...items,updateData]);
            setInputData('')
        }
    }
    const deleteItem = (index) => {
     const updateitems = items.filter((elem) => {
         return index != elem.id;
     });
     setItems(updateitems);
    }
    const removeAll = () => {
        setItems([]);
    }
const editItem = (id) => {
    let newEdit=items.find((elem) => {
        return elem.id == id;
        


    });
    console.log(newEdit)
    SetToggle(false);
        setInputData(newEdit.name);
        setValue(id)

}
    
useEffect(() => {
    localStorage.setItem('item store',JSON.stringify(items))
}, [items])

    return (
        <>
        <div className="main-div">
            <div className="child-div">
              <figure>
                  <figcaption style={{color:'black',fontWeight:'bold'}}>TODO LIST </figcaption>
              </figure>
              <div className="addItems">
                  <input type="text" placeholder="Add items...." 
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value) }
                  />
                  {
                      toggle ? <AddIcon  onClick={addItem} style={{marginLeft:'-36px', marginTop:'-88px',marginBottom:'-2px',fontSize:'32px'}} title="add item" />:
                      <EditIcon  onClick={addItem} style={{marginLeft:'-36px', marginTop:'-88px',marginBottom:'-2px',fontSize:'32px'}} title="update item" />


                  }
                 
                
                  
              </div>
              <div className="showItems">
                  {
                      items.map((elem) => {
                          return(
                            <div className="eachItem" key={elem.id}>
                            <h3>{elem.name}</h3>
                            <div>
                            <EditIcon onClick={() =>editItem(elem.id)} title="Edit Items" style={{fontSize:'32px'}} />
                            <DeleteIcon onClick={() =>deleteItem(elem.id)} title="Delete Items" style={{fontSize:'32px'}} />
                            </div>
                        </div>
                          )

                      })
                  }
                 
              </div>
              {/* clear all button */}
              <div className="showItems">
                  <button className="btn effect04" onClick={removeAll} data-sm-link-text="Remove All">
                      <span>Check List</span></button>
              </div>

            </div>

        </div>
        </>
    )
}

export default Todo
