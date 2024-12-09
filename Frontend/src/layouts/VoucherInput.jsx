import "./VoucherInput.css"

function VoucherInput() {
  return (
    <>
    <div className="divider">
      <p>item name &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p> 
                   <p>qty</p>
                   <p>unit</p>
                   <p>rate incl.of taxes</p>
                   <p>rate </p>
                   <p>total &nbsp;&nbsp;</p>
    </div>
    <div className="v-inputfield input-group">
      <input type="text" className="input-box " />
      <input type="text" className="input-box form-control" />
      <input type="text" className="input-box form-control"/>
      <input type="text" className="input-box form-control"/>
      <input type="text" className="input-box form-control"/>
      <input type="text" className="input-box form-control"/>
    </div>
    </>
  )
}

export default VoucherInput
