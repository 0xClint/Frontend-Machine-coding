export interface Istatus {
  id: number | string;
  status: string;
  label: string | number;
  children: Istatus[];
}

export enum Estatus {
  CHECKED = "checked",
  UNCHECKED = "unchecked",
  INDETERMINATE = "indeterminate",
}

export const statusDummyData: Istatus[] = [
  {
    id: 1,
    status: Estatus.INDETERMINATE, // Contains both checked and unchecked items
    label: "Work Projects",
    children: [
      {
        id: 2,
        status: Estatus.INDETERMINATE, // Project X has mixed children
        label: "Project X",
        children: [
          {
            id: 3,
            status: Estatus.INDETERMINATE, // UX Design: 1 checked, 1 unchecked
            label: "UX Design",
            children: [
              {
                id: 4,
                status: Estatus.CHECKED,
                label: "Wireframes.sketch",
                children: [],
              },
              {
                id: 5,
                status: Estatus.UNCHECKED,
                label: "Prototype.fig",
                children: [],
              },
            ],
          },
          {
            id: 6,
            status: Estatus.INDETERMINATE, // Development: 1 checked, 1 unchecked
            label: "Development",
            children: [
              {
                id: 7,
                status: Estatus.CHECKED,
                label: "Frontend",
                children: [],
              },
              {
                id: 8,
                status: Estatus.UNCHECKED,
                label: "Backend",
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 9,
        status: Estatus.UNCHECKED,
        label: "Project Y",
        children: [
          {
            id: 10,
            status: Estatus.UNCHECKED,
            label: "Research",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 11,
    status: Estatus.UNCHECKED,
    label: "Personal",
    children: [
      {
        id: 12,
        status: Estatus.UNCHECKED,
        label: "Finance",
        children: [],
      },
    ],
  },
];
