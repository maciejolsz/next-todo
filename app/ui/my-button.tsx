import {twMerge} from "tailwind-merge";

type MyButtonProps = {
  title: string;
  isActive?: boolean;
  children?: any;
}

export default function MyButton(props: MyButtonProps) {
  return <button className={twMerge(
      "px-4 py-2 border-b-2 border-b-orange-rgb font-light text-black-rgb transition-all duration-100 ease-linear hover:text-white-rgb hover:bg-orange-rgb",
      props.isActive ? 'text-white-rgb bg-orange-rgb' : ''
    )}>
      {props.children} {props.title}
    </button>;
}
