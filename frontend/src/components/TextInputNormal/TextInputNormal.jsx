import { useState } from 'react';
import styles from './TextInputNormal.module.css';
import classNames from 'classnames/bind';

export const TextInputNormal = ({
  size,
  states,
  label,
  id,
  width,
  placeholder,
  onChange,
  value,
}) => {
  const cx = classNames.bind(styles);

  const textInputMode = size === 'l' ? cx('size-l') : cx('size-s');
  const textInputState = states === 'initial' ? cx('initial') : cx('error');

  const textInputClassName = `${cx(
    'TextInput'
  )} ${textInputMode} ${textInputState}`;

  const LabelClassName = `${cx('typo-dropdown-header')} ${cx('label')}`;

  const InputCLassName = `${cx('typo-body')} ${cx('input')}`;

  return (
    <div style={{ width }} className={textInputClassName}>
      <label className={LabelClassName} htmlFor={id}>
        {label}
      </label>
      <input
        className={InputCLassName}
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};
