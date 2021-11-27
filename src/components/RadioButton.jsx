import { getNewId } from '../services/idService';

export default function RadioButton({
  id = getNewId(),
  name = 'radioButtonName',
  children: buttonDescription = 'Descrição do botão',
  buttonChecked = false,
  onButtonClick = null,
}) {
  function handleRadioButtonChange() {
    if (onButtonClick) {
      onButtonClick();
    }
  }

  return (
    <div className="flex flex-row items-center space-x-2">
      <input
        id={id}
        type="radio"
        name={name}
        checked={buttonChecked}
        onChange={handleRadioButtonChange}
      />
      <label htmlFor={id}>{buttonDescription}</label>
    </div>
  );
}
