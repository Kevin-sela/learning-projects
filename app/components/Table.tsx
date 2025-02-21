"use client";
import React, { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  Table as HerouiTable,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@heroui/react";

interface Item {
  id: number;
  name: string;
  description: string;
  status: "active" | "paused" | "vacation";
  avatar: string;
  email: string;
}

const statusColorMap: Record<string, "success" | "danger" | "warning"> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function TableComponent() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      name: "Item 1",
      description: "Description 1",
      status: "active",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      email: "item1@example.com"
    },
    {
      id: 2,
      name: "Item 2",
      description: "Description 2",
      status: "paused",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      email: "item2@example.com"
    }
  ]);

  const schema = yup.object({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const renderCell = useCallback((item: Item, columnKey: React.Key) => {

    const cellValue = item[columnKey as keyof Item];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{radius: "lg", src: item.avatar}}
            description={item.email}
            name={cellValue}
          >
            {item.email}
          </User>
        );
      case "description":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[item.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit">
              <button 
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.click()}
                onClick={() => {
                  setIsCreating(false);
                  setSelectedItem(item);
                  reset({
                    name: item.name,
                    description: item.description
                  });
                  onOpen();
                }}
              >
                <PencilIcon className="h-5 w-5" />
              </button>
            </Tooltip>
            <Tooltip color="danger" content="Delete">
              <button 
                className="text-lg text-danger cursor-pointer active:opacity-50"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.click()}
                onClick={() => {
                  setSelectedItem(item);
                  setItems(items.filter(i => i.id !== item.id));
                }}
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, [items]);

  return (
    <div className="overflow-x-auto bg-transparent">
      <HerouiTable aria-label="Example table with custom cells">
        <TableHeader columns={[
          {name: "NAME", uid: "name"},
          {name: "DESCRIPTION", uid: "description"},
          {name: "STATUS", uid: "status"},
          {name: "ACTIONS", uid: "actions"}
        ]}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={String(item.id)}>

              {(columnKey: string) => <TableCell>{renderCell(item, columnKey)}</TableCell>}

            </TableRow>
          )}
        </TableBody>
      </HerouiTable>

      <div className="flex px-10 min-h-[80vh] justify-center items-center flex-col gap-4">
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}

        <Button 
          color="primary" 
          variant="bordered"
          className="mb-4"
          onPress={() => {
            setIsCreating(true);
            setSelectedItem(null);
            reset();
            onOpen();
          }}
        >
          Create New Item
        </Button>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose: () => void) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {isCreating ? 'Create New Item' : `Edit ${selectedItem?.name}`}
                </ModalHeader>
                <ModalBody>
                  <form
                    id="item-form"
                    onSubmit={handleSubmit((data) => {
                      if (isCreating) {
                        const newItem = {
                          id: Date.now(),
                          name: data.name,
                          description: data.description,
                          status: "active" as const,
                          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                          email: `${data.name.toLowerCase().replace(/\s+/g, '')}@example.com`
                        };
                        setItems((prevItems) => [...prevItems, newItem]);
                      } else if (selectedItem) {
                        setItems((prevItems) =>
                          prevItems.map((item) =>
                            item.id === selectedItem.id
                              ? { ...item, name: data.name, description: data.description }
                              : item
                          )
                        );
                        setSelectedItem(null);
                      }
                      reset();
                      setIsCreating(false);
                      setSuccessMessage(
                        isCreating 
                          ? "Item created successfully!" 
                          : "Item updated successfully!"
                      );
                      setTimeout(() => setSuccessMessage(""), 3000);
                      onClose();
                    })}
                  >
                    <div className="flex flex-col gap-4">
                      <Controller
                        name="name"
                        control={control}
                        defaultValue={selectedItem?.name || ""}
                        render={({ field }) => (
                          <div>
                            <input
                              {...field}
                              type="text"
                              className="border p-2 rounded w-full"
                              placeholder="Item name"
                            />
                            {errors.name && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                      <Controller
                        name="description"
                        control={control}
                        defaultValue={selectedItem?.description || ""}
                        render={({ field }) => (
                          <div>
                            <textarea
                              {...field}
                              className="border p-2 rounded w-full"
                              placeholder="Item description"
                            />
                            {errors.description && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.description.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                    </div>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button 
                    type="submit"
                    color="primary"
                    form="item-form"
                    onPress={onClose}
                  >
                    Save Changes
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
