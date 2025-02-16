"use client";
import { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@nextui-org/react";

interface Item {
  id: number;
  name: string;
  description: string;
}

export default function Table() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Item 1", description: "Description 1" },
    { id: 2, name: "Item 2", description: "Description 2" },
  ]);

  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Button
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                  onPress={() => {
                    setIsCreating(false);
                    setSelectedItem(item);
                    setEditName(item.name);
                    setEditDescription(item.description);
                    onOpen();
                  }}
                >
                  <PencilIcon className="h-5 w-5" />
                </Button>
                <Button
                  className="text-red-600 hover:text-red-900"
                  onPress={() => {
                    setSelectedItem(item);
                    setItems(items.filter(i => i.id !== item.id));
                  }}
                >
                  <TrashIcon className="h-5 w-5" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex px-10 min-h-[80vh] justify-center items-center flex-col gap-4">
        <Button 
          color="primary" 
          className="mb-4"
          onPress={() => {
            setIsCreating(true);
            setSelectedItem(null);
            setEditName('');
            setEditDescription('');
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
                    onSubmit={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (isCreating) {
                        const newItem = {
                          id: Date.now(),
                          name: editName,
                          description: editDescription
                        };
                        setItems(prevItems => [...prevItems, newItem]);
                        setEditName('');
                        setEditDescription('');
                      } else if (selectedItem) {
                        setItems(prevItems => 
                          prevItems.map(item =>
                            item.id === selectedItem.id
                              ? { ...item, name: editName, description: editDescription }
                              : item
                          )
                        );
                        setSelectedItem(null);
                      }
                      setIsCreating(false);
                      onClose();
                    }}
                  >

                    <div className="flex flex-col gap-4">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="border p-2 rounded"
                        placeholder="Item name"
                        required
                      />
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="border p-2 rounded"
                        placeholder="Item description"
                        required
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
