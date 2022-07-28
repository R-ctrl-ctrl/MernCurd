import './App.css';
import { useState, useEffect } from 'react'
import Axios from 'axios'


function App() {

  const [name, setname] = useState("")
  const [content, setcontent] = useState("")
  const [notelist, setnotelist] = useState([])
  const [style, setStyle] = useState("cont");
  const [updateinp,setupdateinp] = useState("")
  const [id,setid] = useState(0)


  const updateclick = (id) => {
    setStyle("cont2")
    setid(id)
  }


  const updatenotes = (id)=>{
      Axios.put("http://localhost:3001/update",{
        id:id,
        newContent:updateinp,
      })
  }

  const doneclick = () => {
    setStyle("cont")

    console.log(id)
    updatenotes(id)
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setnotelist(response.data)
      console.log(notelist)
    })
  }, [notelist])

  const btnClick = () => {
    Axios.post("http://localhost:3001/insert", {
      name: name,
      content: content,
    })
  }

  const deletenote = (id)=>{
    Axios.delete(`http://localhost:3001/delete/${id}`)
  }


  return (
    <div className="App">
      <div className="main">
        <input type='text' className='nameinp' placeholder="Enter name" onChange={(e) => setname(e.target.value)} />
        <input type='text' className='contentinp' placeholder="Enter content" onChange={(e) => { setcontent(e.target.value) }} />
        <button className='button' onClick={btnClick}>ADD NOTE</button>
      </div>
      <div className={style}>
        <input placeholder='Enter new content' className='updateinp' onChange={(e)=>{setupdateinp(e.target.value)}} />
        <button className='donebtn' onClick={doneclick} >Done</button>
      </div>
      <div className="container">
        <div className='semi'>
          {

            notelist.map((note, key) => {
              return (<div key={key}>
                <div className="card">
                  <div className="name">{note.Name}</div>
                  <div className="content">{note.Content}</div>

                  <div className="btns">
                    <button className='updatebtn' onClick={()=>  updateclick(note._id)}>Update</button>
                    <button className='deletebtn' onClick={()=> deletenote(note._id)}>Delete</button>
                  </div>
                </div>
              </div>)

            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
