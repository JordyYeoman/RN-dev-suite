'use strict';
var React = require('react-native');
var bleManager = React.NativeModules.BleManager;

export class BleManager {
  constructor() {
    this.isPeripheralConnected = this.isPeripheralConnected.bind(this);
  }

  read(peripheralId: any, serviceUUID: any, characteristicUUID: any) {
    return new Promise((fulfill, reject) => {
      bleManager.read(
        peripheralId,
        serviceUUID,
        characteristicUUID,
        (error: any, data: unknown) => {
          if (error) {
            reject(error);
          } else {
            fulfill(data);
          }
        },
      );
    });
  }

  readRSSI(peripheralId: any) {
    return new Promise((fulfill, reject) => {
      bleManager.readRSSI(peripheralId, (error: any, rssi: unknown) => {
        if (error) {
          reject(error);
        } else {
          fulfill(rssi);
        }
      });
    });
  }

  refreshCache(peripheralId: any) {
    return new Promise((fulfill, reject) => {
      bleManager.refreshCache(peripheralId, (error: any, result: unknown) => {
        if (error) {
          reject(error);
        } else {
          fulfill(result);
        }
      });
    });
  }

  retrieveServices(peripheralId: any, services: any) {
    return new Promise((fulfill, reject) => {
      bleManager.retrieveServices(
        peripheralId,
        services,
        (error: any, peripheral: unknown) => {
          if (error) {
            reject(error);
          } else {
            fulfill(peripheral);
          }
        },
      );
    });
  }

  write(
    peripheralId: any,
    serviceUUID: any,
    characteristicUUID: any,
    data: any,
    maxByteSize: number | null,
  ) {
    if (maxByteSize == null) {
      maxByteSize = 20;
    }
    return new Promise<void>((fulfill, reject) => {
      bleManager.write(
        peripheralId,
        serviceUUID,
        characteristicUUID,
        data,
        maxByteSize,
        (error: any) => {
          if (error) {
            reject(error);
          } else {
            fulfill();
          }
        },
      );
    });
  }

  writeWithoutResponse(
    peripheralId: any,
    serviceUUID: any,
    characteristicUUID: any,
    data: any,
    maxByteSize: number | null,
    queueSleepTime: number | null,
  ) {
    if (maxByteSize == null) {
      maxByteSize = 20;
    }
    if (queueSleepTime == null) {
      queueSleepTime = 10;
    }
    return new Promise<void>((fulfill, reject) => {
      bleManager.writeWithoutResponse(
        peripheralId,
        serviceUUID,
        characteristicUUID,
        data,
        maxByteSize,
        queueSleepTime,
        (error: any) => {
          if (error) {
            reject(error);
          } else {
            fulfill();
          }
        },
      );
    });
  }

  connect(peripheralId: any) {
    return new Promise<void>((fulfill, reject) => {
      bleManager.connect(peripheralId, (error: any) => {
        if (error) {
          reject(error);
        } else {
          fulfill();
        }
      });
    });
  }

  createBond(peripheralId: any, peripheralPin = null) {
    return new Promise<void>((fulfill, reject) => {
      bleManager.createBond(peripheralId, peripheralPin, (error: any) => {
        if (error) {
          reject(error);
        } else {
          fulfill();
        }
      });
    });
  }

  removeBond(peripheralId: any) {
    return new Promise<void>((fulfill, reject) => {
      bleManager.removeBond(peripheralId, (error: any) => {
        if (error) {
          reject(error);
        } else {
          fulfill();
        }
      });
    });
  }

  disconnect(peripheralId: any, force = true) {
    return new Promise<void>((fulfill, reject) => {
      bleManager.disconnect(peripheralId, force, (error: any) => {
        if (error) {
          reject(error);
        } else {
          fulfill();
        }
      });
    });
  }

  startNotification(
    peripheralId: any,
    serviceUUID: any,
    characteristicUUID: any,
  ) {
    return new Promise<void>((fulfill, reject) => {
      bleManager.startNotification(
        peripheralId,
        serviceUUID,
        characteristicUUID,
        (error: any) => {
          if (error) {
            reject(error);
          } else {
            fulfill();
          }
        },
      );
    });
  }

  startNotificationUseBuffer(
    peripheralId: any,
    serviceUUID: any,
    characteristicUUID: any,
    buffer: any,
  ) {
    return new Promise<void>((fulfill, reject) => {
      bleManager.startNotificationUseBuffer(
        peripheralId,
        serviceUUID,
        characteristicUUID,
        buffer,
        (error: any) => {
          if (error) {
            reject(error);
          } else {
            fulfill();
          }
        },
      );
    });
  }

  stopNotification(
    peripheralId: any,
    serviceUUID: any,
    characteristicUUID: any,
  ) {
    return new Promise<void>((fulfill, reject) => {
      bleManager.stopNotification(
        peripheralId,
        serviceUUID,
        characteristicUUID,
        (error: any) => {
          if (error) {
            reject(error);
          } else {
            fulfill();
          }
        },
      );
    });
  }

  checkState() {
    bleManager.checkState();
  }

  start(options: {} | null) {
    return new Promise<void>((fulfill, reject) => {
      if (options == null) {
        options = {};
      }
      bleManager.start(options, (error: any) => {
        if (error) {
          reject(error);
        } else {
          fulfill();
        }
      });
    });
  }

  scan(
    serviceUUIDs: any,
    seconds: any,
    allowDuplicates: boolean | null,
    scanningOptions: any,
  ) {
    return new Promise<void>((fulfill, reject) => {
      if (allowDuplicates == null) {
        allowDuplicates = false;
      }

      // (ANDROID) Match as many advertisement per filter as hw could allow
      // dependes on current capability and availability of the resources in hw.
      if (scanningOptions?.numberOfMatches == null) {
        scanningOptions.numberOfMatches = 3;
      }

      // (ANDROID) Defaults to MATCH_MODE_AGGRESSIVE
      if (scanningOptions.matchMode == null) {
        scanningOptions.matchMode = 1;
      }

      // (ANDROID) Defaults to SCAN_MODE_LOW_POWER on android
      if (scanningOptions.scanMode == null) {
        scanningOptions.scanMode = 0;
      }

      if (scanningOptions.reportDelay == null) {
        scanningOptions.reportDelay = 0;
      }

      bleManager.scan(
        serviceUUIDs,
        seconds,
        allowDuplicates,
        scanningOptions,
        (error: any) => {
          if (error) {
            reject(error);
          } else {
            fulfill();
          }
        },
      );
    });
  }

  stopScan() {
    return new Promise<void>((fulfill, reject) => {
      bleManager.stopScan((error: null) => {
        if (error != null) {
          reject(error);
        } else {
          fulfill();
        }
      });
    });
  }

  enableBluetooth() {
    return new Promise<void>((fulfill, reject) => {
      bleManager.enableBluetooth((error: null) => {
        if (error != null) {
          reject(error);
        } else {
          fulfill();
        }
      });
    });
  }

  getConnectedPeripherals(serviceUUIDs: any) {
    return new Promise((fulfill, reject) => {
      bleManager.getConnectedPeripherals(
        serviceUUIDs,
        (error: any, result: unknown) => {
          if (error) {
            reject(error);
          } else {
            if (result != null) {
              fulfill(result);
            } else {
              fulfill([]);
            }
          }
        },
      );
    });
  }

  getBondedPeripherals() {
    return new Promise((fulfill, reject) => {
      bleManager.getBondedPeripherals((error: any, result: unknown) => {
        if (error) {
          reject(error);
        } else {
          if (result != null) {
            fulfill(result);
          } else {
            fulfill([]);
          }
        }
      });
    });
  }

  getDiscoveredPeripherals() {
    return new Promise((fulfill, reject) => {
      bleManager.getDiscoveredPeripherals((error: any, result: unknown) => {
        if (error) {
          reject(error);
        } else {
          if (result != null) {
            fulfill(result);
          } else {
            fulfill([]);
          }
        }
      });
    });
  }

  removePeripheral(peripheralId: any) {
    return new Promise<void>((fulfill, reject) => {
      bleManager.removePeripheral(peripheralId, (error: any) => {
        if (error) {
          reject(error);
        } else {
          fulfill();
        }
      });
    });
  }

  isPeripheralConnected(peripheralId: any, serviceUUIDs: any) {
    return this.getConnectedPeripherals(serviceUUIDs).then((result: any) => {
      if (
        result.find((p: {id: any}) => {
          return p.id === peripheralId;
        })
      ) {
        return true;
      } else {
        return false;
      }
    });
  }

  requestConnectionPriority(peripheralId: any, connectionPriority: any) {
    return new Promise((fulfill, reject) => {
      bleManager.requestConnectionPriority(
        peripheralId,
        connectionPriority,
        (error: any, status: unknown) => {
          if (error) {
            reject(error);
          } else {
            fulfill(status);
          }
        },
      );
    });
  }

  requestMTU(peripheralId: any, mtu: any) {
    return new Promise((fulfill, reject) => {
      bleManager.requestMTU(peripheralId, mtu, (error: any, _mtu: any) => {
        if (error) {
          reject(error);
        } else {
          fulfill(_mtu);
        }
      });
    });
  }

  setName(name: any) {
    bleManager.setName(name);
  }
}
