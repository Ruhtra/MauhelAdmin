import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GripVertical, X } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";

interface SortableItemProps {
  id: string;
  index: number;
  onRemove: () => void;
}

function SortableItem({ id, index, onRemove }: SortableItemProps) {
  const { control } = useFormContext();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="p-2 mb-2 flex items-center space-x-2 bg-white shadow-sm rounded-lg"
    >
      <div {...attributes} {...listeners} className="cursor-move">
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>
      <FormField
        control={control}
        name={`alternatives.${index}.content`}
        render={({ field }) => (
          <FormItem className="flex-grow">
            <FormControl>
              <Input
                {...field}
                className="text-sm"
                placeholder={`Alternativa ${String.fromCharCode(65 + index)}`}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="correctAlternative"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex items-center"
              >
                <RadioGroupItem value={index.toString()} id={`correct-${id}`} />
                <label
                  htmlFor={`correct-${id}`}
                  className="text-xs text-gray-600 ml-1"
                >
                  Correta
                </label>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
    </Card>
  );
}

export function DraggableAlternatives() {
  const { control } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "alternatives",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-2">
        <SortableContext items={fields} strategy={verticalListSortingStrategy}>
          {fields.map((field, index) => (
            <SortableItem
              key={field.id}
              id={field.id}
              index={index}
              onRemove={() => remove(index)}
            />
          ))}
        </SortableContext>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ content: "" })}
          className="w-full text-sm"
        >
          Adicionar alternativa
        </Button>
      </div>
    </DndContext>
  );
}
