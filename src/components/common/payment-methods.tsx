/*
|----------------------------------------------
| setting up ui for payment method
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: mealnight, 2022
|----------------------------------------------
*/

const PaymentMethod = (props) => {
  return (
    <div className="flex flex-row justify-between items-center w-full mx-auto p-2">
      {props.paymentMethods.map((method) => {
        return (
          method.visible && (
            <div
              key={method.name}
              onClick={() => props.handleSelectedPaymentMethod(method.name)}
              className="w-24 flex justify-center items-center py-2 px-2"
            >
              <input
                type="radio"
                onChange={() => {}}
                className="w-6 h-6 rounded-full"
                checked={method.selected}
              />
              <span className="font-medium capitalize ml-2">{method.name}</span>
            </div>
          )
        )
      })}
    </div>
  )
}
export default PaymentMethod
