/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "fdition";

export interface InitBasicAddResponse {
  status: string;
  message: string[];
}

export interface InitPcInfoAddResponse {
  status: string;
  message: string[];
}

export interface InitSWInfoAddResponse {
  status: string;
  message: string[];
}

export interface InitCameraInfoAddResponse {
  status: string;
  message: string[];
}

export interface InitGimbalInfoAddResponse {
  status: string;
  message: string[];
}

export interface InitSwitchInfoAddResponse {
  status: string;
  message: string[];
}

/** Sector 정보를 갱신한다. */
export interface InitBasicAdd {
  fditionId: string;
  latitude: string;
  longitude: string;
}

export interface InitPcInfoAdd {
  pcId: string;
  fditionId: string;
  id: string;
  ip: string;
  os: string;
  gpu: string;
  gpuDriver: string;
}

export interface InitSWInfoAdd {
  swId: string;
  pcId: string;
  fditionId: string;
  ip: string;
  name: string;
  ver: string;
}

export interface InitCameraInfoAdd {
  cameraId: string;
  fditionId: string;
  id: string;
  ip: string;
  model: string;
  fw: string;
}

export interface InitGimbalInfoAdd {
  gimbalId: string;
  fditionId: string;
  ip: string;
}

export interface InitSwitchInfoAdd {
  fditionId: string;
  id: string;
  ip: string;
  brand: string;
  model: string;
}

export const FDITION_PACKAGE_NAME = "fdition";

export interface FditionServiceClient {
  initPcInfo(request: InitPcInfoAdd): Observable<InitPcInfoAddResponse>;

  initSwInfo(request: InitSWInfoAdd): Observable<InitSWInfoAddResponse>;

  initCameraInfo(request: InitCameraInfoAdd): Observable<InitCameraInfoAddResponse>;

  initGimbalInfo(request: InitGimbalInfoAdd): Observable<InitGimbalInfoAddResponse>;

  initSwitchInfo(request: InitSwitchInfoAdd): Observable<InitSwitchInfoAddResponse>;
}

export interface FditionServiceController {
  initPcInfo(
    request: InitPcInfoAdd,
  ): Promise<InitPcInfoAddResponse> | Observable<InitPcInfoAddResponse> | InitPcInfoAddResponse;

  initSwInfo(
    request: InitSWInfoAdd,
  ): Promise<InitSWInfoAddResponse> | Observable<InitSWInfoAddResponse> | InitSWInfoAddResponse;

  initCameraInfo(
    request: InitCameraInfoAdd,
  ): Promise<InitCameraInfoAddResponse> | Observable<InitCameraInfoAddResponse> | InitCameraInfoAddResponse;

  initGimbalInfo(
    request: InitGimbalInfoAdd,
  ): Promise<InitGimbalInfoAddResponse> | Observable<InitGimbalInfoAddResponse> | InitGimbalInfoAddResponse;

  initSwitchInfo(
    request: InitSwitchInfoAdd,
  ): Promise<InitSwitchInfoAddResponse> | Observable<InitSwitchInfoAddResponse> | InitSwitchInfoAddResponse;
}

export function FditionServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["initPcInfo", "initSwInfo", "initCameraInfo", "initGimbalInfo", "initSwitchInfo"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("FditionService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("FditionService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const FDITION_SERVICE_NAME = "FditionService";
