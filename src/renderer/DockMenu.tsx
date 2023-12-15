
import React, { useRef, useState, useEffect } from 'react';
import { Dock } from 'primereact/dock';
import { Tooltip } from 'primereact/tooltip';
import { Dialog } from 'primereact/dialog';
import { Terminal } from 'primereact/terminal';
import { TerminalService } from 'primereact/terminalservice';
import { Galleria } from 'primereact/galleria';
import { Toast } from 'primereact/toast';
import { Tree } from 'primereact/tree';
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { NodeService } from './service/NodeService';
import { PhotoService } from './service/PhotoService';
import './DockDemo.css';
import { Button } from 'primereact/button';

export default function DockMenu() {
    const [displayTerminal, setDisplayTerminal] = useState(false);
    const [displayFinder, setDisplayFinder] = useState(false);
    const [images, setImages] = useState(null);
    const [nodes, setNodes] = useState(null);
    const toast = useRef<Toast>(null);
    const toast2 = useRef<Toast>(null);
    const galleria = useRef<Galleria>(null);

    const dockItems = [
        {
            label: 'Session',
            icon: () => <img alt="Finder" src="https://primefaces.org/cdn/primereact/images/dock/finder.svg" width="100%" />,
            command: () => {
                setDisplayFinder(true);
            }
        },
        {
            label: 'Terminal',
            icon: () => <img alt="Finder" src="https://primefaces.org/cdn/primereact/images/dock/terminal.svg" width="100%" />,
            command: () => {
                setDisplayTerminal(true);
            }
        },
        {
            label: 'Trash',
            icon: () => <img alt="trash" src="https://primefaces.org/cdn/primereact/images/dock/trash.png" width="100%" />,
            command: () => {
                toast.current.show({ severity: 'info', summary: 'Empty Trash' });
            }
        }
    ];

    const menubarItems : MenuItem[] = [
        {
            label: 'Finder',
            className: 'menubar-root'
        },
        // {
        //     label: 'File',
        //     items: [
        //         {
        //             label: 'New',
        //             icon: 'pi pi-fw pi-plus',
        //             items: [
        //                 {
        //                     label: 'Bookmark',
        //                     icon: 'pi pi-fw pi-bookmark'
        //                 },
        //                 {
        //                     label: 'Video',
        //                     icon: 'pi pi-fw pi-video'
        //                 }
        //             ]
        //         },
        //         {
        //             label: 'Delete',
        //             icon: 'pi pi-fw pi-trash'
        //         },
        //         {
        //             separator: true
        //         },
        //         {
        //             label: 'Export',
        //             icon: 'pi pi-fw pi-external-link'
        //         }
        //     ]
        // },
        // {
        //     label: 'Edit',
        //     items: [
        //         {
        //             label: 'Left',
        //             icon: 'pi pi-fw pi-align-left'
        //         },
        //         {
        //             label: 'Right',
        //             icon: 'pi pi-fw pi-align-right'
        //         },
        //         {
        //             label: 'Center',
        //             icon: 'pi pi-fw pi-align-center'
        //         },
        //         {
        //             label: 'Justify',
        //             icon: 'pi pi-fw pi-align-justify'
        //         }
        //     ]
        // },
        // {
        //     label: 'Users',
        //     items: [
        //         {
        //             label: 'New',
        //             icon: 'pi pi-fw pi-user-plus'
        //         },
        //         {
        //             label: 'Delete',
        //             icon: 'pi pi-fw pi-user-minus'
        //         },
        //         {
        //             label: 'Search',
        //             icon: 'pi pi-fw pi-users',
        //             items: [
        //                 {
        //                     label: 'Filter',
        //                     icon: 'pi pi-fw pi-filter',
        //                     items: [
        //                         {
        //                             label: 'Print',
        //                             icon: 'pi pi-fw pi-print'
        //                         }
        //                     ]
        //                 },
        //                 {
        //                     icon: 'pi pi-fw pi-bars',
        //                     label: 'List'
        //                 }
        //             ]
        //         }
        //     ]
        // },
        // {
        //     label: 'Events',
        //     items: [
        //         {
        //             label: 'Edit',
        //             icon: 'pi pi-fw pi-pencil',
        //             items: [
        //                 {
        //                     label: 'Save',
        //                     icon: 'pi pi-fw pi-calendar-plus'
        //                 },
        //                 {
        //                     label: 'Delete',
        //                     icon: 'pi pi-fw pi-calendar-minus'
        //                 }
        //             ]
        //         },
        //         {
        //             label: 'Archive',
        //             icon: 'pi pi-fw pi-calendar-times',
        //             items: [
        //                 {
        //                     label: 'Remove',
        //                     icon: 'pi pi-fw pi-calendar-minus'
        //                 }
        //             ]
        //         }
        //     ]
        // },
        {
            label: 'Quit'
        }
    ];

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
    };

    const commandHandler = (text: string) => {
        let response;
        let argsIndex = text.indexOf(' ');
        let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

        switch (command) {
            case 'date':
                response = 'Today is ' + new Date().toDateString();
                break;

            case 'greet':
                response = 'Hola ' + text.substring(argsIndex + 1) + '!';
                break;

            case 'random':
                response = Math.floor(Math.random() * 100);
                break;

            case 'clear':
                response = null;
                break;

            default:
                response = 'Unknown command: ' + command;
                break;
        }

        if (response) {
            TerminalService.emit('response', response);
        } else {
            TerminalService.emit('clear');
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('ACCESS_TOKEN')
        localStorage.removeItem('REFRESH_TOKEN')
        window.location.href = "/"
    }
    const start = <i className="pi pi-apple"></i>;
    const end = (
        <React.Fragment>
            <Button rounded severity="danger" aria-label="Cancel" onClick={async () => handleLogout()} icon="pi pi-fw pi-power-off" />
        </React.Fragment>
    );

    return (
        <div className="card dock-demo">
            <Tooltip className="dark-tooltip" target=".dock-advanced .p-dock-action" my="center+15 bottom-15" at="center top" showDelay={150} />
            <Menubar model={menubarItems} start={start} end={end} />
            <div className="dock-window dock-advanced">
                <Toast ref={toast} />
                <Toast ref={toast2} position="top-center" />
                <Dock model={dockItems} />
                <Dialog visible={displayTerminal} breakpoints={{ '960px': '50vw', '600px': '75vw' }} style={{ width: '80%' }} onHide={() => setDisplayTerminal(false)} maximizable blockScroll={false}>
                    <Terminal welcomeMessage="Welcome to PrimeReact (cmd: 'date', 'greet {0}', 'random' and 'clear')" prompt="primereact $" />
                </Dialog>
                <Dialog visible={displayFinder} breakpoints={{ '960px': '50vw', '600px': '75vw' }} style={{ width: '80%', height: '18rem' }} onHide={() => setDisplayFinder(false)} maximizable blockScroll={false}>
                    <Tree value={nodes} />
                </Dialog>
                <Galleria ref={galleria} value={images} responsiveOptions={responsiveOptions} numVisible={2} style={{ width: '400px' }}
                    circular fullScreen showThumbnails={false} showItemNavigators item={itemTemplate} />
            </div>
        </div>
    )
}
        