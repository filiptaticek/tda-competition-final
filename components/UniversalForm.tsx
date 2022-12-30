interface IUniversalForm {
    header:string
    onSubmit:any
    children:any
}

export const UniversalForm = ({header,onSubmit,children}:IUniversalForm)=>{
  return(
    <div className="w-screen left-0 fixed top-0 h-screen bg-black/80">
      <form className="p-10 m-auto rounded-xl relative top-[120px] bg-white w-[500px] border border-black" onSubmit={onSubmit}>
        <p className="text-2xl text-center mb-5">{header}</p>
        {children}
      </form>
    </div>
  )
}