/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

interface IUniversalForm {
    header:any
    onSubmit:any
    closeForm:any
    children:any
}

export const UniversalForm = ({header,onSubmit,children,closeForm}:IUniversalForm)=>{
  return(
    <div className="w-screen left-0 fixed top-0 h-screen bg-black/80">
      <form className="p-10 m-auto rounded-xl relative top-[80px] bg-white w-[500px] border border-black" onSubmit={onSubmit}>
        <img className="relative cursor-pointer mb-[-20px] top-[10px] left-[390px]" src="zavrit_formular.png" onClick={closeForm} ></img>
        <p className="text-2xl text-center mb-5">{header}</p>
        {children}
      </form>
    </div>
  )
}