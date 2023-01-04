export const User = ({firstName,surname}:{firstName:string,surname:string})=>{
  return(
    <div className="w-[90%] text-xl p-5 m-auto border border-black">
      <p>{firstName} {surname}</p>
    </div>
  )
}