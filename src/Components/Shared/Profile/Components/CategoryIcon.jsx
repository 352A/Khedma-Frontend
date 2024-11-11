import {
  IconPaintFilled,
  IconHomeFilled,
  IconCarSuv,
  IconDeviceDesktop,
  IconBriefcaseFilled,
  IconScissors,
} from "@tabler/icons-react";

const CategoryIcon = ({ category, className }) => {
  const categoryIcons = {
    "خدمات الصيانة": (
      <IconPaintFilled width={25} height={25} className={className} />
    ),
    "خدمات المنزل": (
      <IconHomeFilled width={25} height={25} className={className} />
    ),
    "خدمات السيارات": (
      <IconCarSuv width={25} height={25} className={className} />
    ),
    "خدمات التكنولوجيا": (
      <IconDeviceDesktop width={25} height={25} className={className} />
    ),
    "خدمات الشركات": (
      <IconBriefcaseFilled width={25} height={25} className={className} />
    ),
    "خدمات شخصية": (
      <IconScissors width={25} height={25} className={className} />
    ),
  };

  return <div>{categoryIcons[category] || ""}</div>;
};

export default CategoryIcon;
