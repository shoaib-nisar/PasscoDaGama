import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from "./Navbar";
const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [formArray, setformArray] = useState([])
  const ref = useRef()
  const Passwordref = useRef()
  useEffect(() => {
    let passwords = localStorage.getItem("passwords")
    if (passwords) {
      setformArray(JSON.parse(passwords))
    }
  }, [])

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  const handleSave = () => {
    setformArray([...formArray, { ...form, id: uuidv4() }])
    localStorage.setItem("passwords", JSON.stringify([...formArray, form]))
    showPassword()
    toast('Password has been saved!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",

    });
  }

  const deletePassword = (id) => {
    if (confirm("Are you sure yo want to delete it")) {
      setformArray(formArray.filter(item => item.id !== id))
      localStorage.setItem("passwords", JSON.stringify(formArray.filter(item => item.id !== id)))
      toast('Password deleted successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

      });
    }
  }
  const editPassword = (id) => {
    setform(formArray.filter(item => item.id === id)[0])
    setformArray(formArray.filter(item => item.id !== id))
    ref.current.src = "../src/assets/prt2.png"
  }

  const copyPassword = (text) => {
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",

    });
    navigator.clipboard.writeText(text)
  }

  const showPassword = () => {
    // Passwordref.current.type = "text"
    console.log(ref.current.src)
    if (ref.current.src.includes('/assets/prt2.png')) {
      Passwordref.current.type = "password"
      ref.current.src = "../src/assets/prt.png"
    }
    else {
      Passwordref.current.type = "text"
      ref.current.src = "../src/assets/prt2.png"
    }
  }

  return (
    <div className="flex-grow">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>


      <div className="w-full max-w-2xl px-4 mx-auto flex flex-col items-center ">
        <span className="mt-4 flex-row "><span className="text-2xl font-extrabold ">&lt;Passco</span>
          <span className="mx-0 px-0 text-2xl font-extrabold  text-amber-300" style={{
            WebkitTextStroke: '1px amber',
          }}>DaGama/&gt;</span></span>
        <span className="mb-5">Your Own Password Manager</span>
        <input onChange={handleChange}
          className="border-2 border-gray-900 min-w-full rounded-3xl px-3 my-4  py-1.5"
          type="text"
          value={form.site}
          name="site"
          placeholder="Enter Website URL"
        />
        <div className="flex flex-col items-center sm:flex-row min-w-full justify-between my-3 ">
          <input onChange={handleChange}
            value={form.username}
            name="username"
            className="border-2 border-gray-900 w-xs rounded-3xl px-3 my-4 mr-2.5 py-1.5 "
            type="text"
            placeholder="Enter Username"
          />
          <div className="flex">
            <input ref={Passwordref} onChange={handleChange}
              value={form.password}
              name="password"
              className="border-2 border-gray-900 w-2xs rounded-3xl px-3 my-4 mx-2 py-1.5"
              type="text"
              placeholder="Enter Password"
            />
            <img
              ref={ref}
              src="../src/assets/prt2.png"
              alt="Pirate"
              className="w-9 h-8 flex overflow-hidden rounded-full relative  right-[60px] top-[19px] cursor-pointer"
              onClick={showPassword}
            />
          </div>
        </div>
        <button disabled={
          form.site.length < 8 ||
          form.username.length < 3 ||
          form.password.length < 3
        } onClick={() => handleSave()} className="bg-amber-300 cursor-pointer border border-gray-900 hover:bg-amber-200  px-3 py-1.5 mb-9 flex justify-center rounded-3xl"><lord-icon
          src="https://cdn.lordicon.com/jgnvfzqg.json"
          trigger="hover"
          style={{ "width": "25px", "height": "25px" }}>
          </lord-icon>Save</button>
      </div>
      <div>
        {formArray.length === 0 && <div className="flex justify-center items-center"><lord-icon
          src="https://cdn.lordicon.com/jcqzdqnu.json"
          trigger="hover"
          style={{ "width": "250px", "height": "250px" }}>
        </lord-icon>
          <div className="text-2xl">No Passwords to show</div></div>}
        {formArray.length !== 0 &&
          <table className="w-[65vw] m-auto overflow-x-auto text-sm md:text-base">
            <thead className='bg-amber-300 '>
              <tr className=" text-sm  md:text-lg ">
                <th>Website</th>
                <th>Username</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-gray-900 text-white max-w-full md:w-0.5'>
              {formArray.map((item, index) => {
                return <tr key={index}>
                  <td className='py-5 px-2 text-center'>
                    <div className="flex flex-col md:flex-row justify-center items-center text-sm  sm:text-md"><a
                      href={item.site.startsWith('http') ? item.site : `https://${item.site}`}
                      target='_blank'
                      className="break-words max-w-[100px] sm:max-w-full"
                    // rel="noopener noreferrer"
                    >{item.site}</a><button onClick={() => copyPassword(item.site)} className="bg-amber-300 cursor-pointer border border-gray-900 hover:bg-amber-200  px-2 py-1 sm:mx-2 justify-center rounded-2xl"> <lord-icon
                      src="https://cdn.lordicon.com/iykgtsbt.json"
                      trigger="hover"
                      style={{ "width": "20px", "height": "20px" }}>
                    </lord-icon></button></div></td>
                  <td className='py-5 px-5 text-center'>
                    <div className="flex flex-col md:flex-row justify-center items-center text-sm sm:text-md">{item.username} <button onClick={() => copyPassword(item.username)} className="bg-amber-300 cursor-pointer border border-gray-900 hover:bg-amber-200  px-2 py-1 mx-2 justify-center rounded-2xl"> <lord-icon
                      src="https://cdn.lordicon.com/iykgtsbt.json"
                      trigger="hover"
                      style={{ "width": "20px", "height": "20px" }}>
                    </lord-icon></button></div></td>
                  <td className='py-5 px-5 text-center'>
                    <div className="flex flex-col md:flex-row justify-center items-center text-sm sm:text-md">{"*".repeat(item.password.length)} <button onClick={() => copyPassword(item.password)} className="bg-amber-300 cursor-pointer border border-gray-900 hover:bg-amber-200  px-2 py-1 mx-2 justify-center rounded-2xl"> <lord-icon
                      src="https://cdn.lordicon.com/iykgtsbt.json"
                      trigger="hover"
                      style={{ "width": "20px", "height": "20px" }}>
                    </lord-icon></button></div>
                  </td>
                  <td className='py-5 px-5 text-center'>
                    <button onClick={() => editPassword(item.id)} className="bg-amber-300 cursor-pointer border border-gray-900 hover:bg-amber-200  px-2 py-1 sm:mx-2 my-2 justify-center rounded-2xl"> <lord-icon
                      src="https://cdn.lordicon.com/gwlusjdu.json"
                      trigger="hover"
                      style={{ "width": "25px", "height": "25px" }}>
                    </lord-icon></button>
                    <button onClick={() => deletePassword(item.id)} className="bg-amber-300 cursor-pointer border border-gray-900 hover:bg-amber-200  px-2 py-1 sm:mx-2 my-2 justify-center rounded-2xl"><lord-icon
                      src="https://cdn.lordicon.com/skkahier.json"
                      trigger="hover"
                      style={{ "width": "25px", "height": "25px" }}>
                    </lord-icon></button>
                  </td>
                </tr>
              }
              )}

            </tbody>
          </table>}
      </div>
    </div>
  );
};

export default Manager;
