import { TaskCategory } from "../generator/output/operations";
import { TaskmasterForm } from "../types/taskmasterForm";

export const taskCategoryOptionList: Array<TaskmasterForm.InputSelectOption> = [
  [TaskCategory.DevelopmentFeature, "Development - Feature"],
  [TaskCategory.DevelopmentBug, "Development - Bug"],
  [TaskCategory.DevelopmentOther, "Development - Other"],
  [TaskCategory.Consulting, "Consulting"],
  [TaskCategory.Meeting, "Meeting"],
  [TaskCategory.Other, "Other"]
];

export const getTaskCategoryDescription = (
  taskCategory: TaskCategory
): string => {
  const [option] = taskCategoryOptionList.filter(
    ([filterTaskCategory]) => filterTaskCategory === taskCategory
  );

  return option[1];
};
