import Label from '@common/Label';
import React from 'react';
import Button from '@common/Button';

interface LabelItemProps {
  name: string;
  fontColor: string;
  backgroundColor: string;
  description: string;
}

const LabelItem = (props: LabelItemProps) => {
  const { name, fontColor, backgroundColor, description } = props;
  return (
    <div className="flex h-24 items-center justify-between border-t border-t-gray-300 px-8 py-10">
      <Label
        labelName={name}
        fontColor={fontColor}
        backgroundColor={backgroundColor}
      />
      <p className="w-3/5 text-gray-600">{description}</p>
      <section className="flex gap-x-4">
        <Button
          title="편집"
          onClick={() => {
            console.log('레이블 편집');
          }}
          isFlexible={true}
          size="Small"
          color="Gray"
          type="Ghost"
          condition="Press"
          iconName="edit"
          fontSize={'text-sm'}
        />
        <Button
          title="삭제"
          onClick={() => {
            console.log('레이블 삭제');
          }}
          isFlexible={true}
          size="Small"
          color="Red"
          type="Ghost"
          condition="Press"
          iconName="trash"
          fontSize={'text-sm'}
        />
      </section>
    </div>
  );
};

export default LabelItem;
