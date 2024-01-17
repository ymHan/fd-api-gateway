/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "fdition";

export interface InputStatusResponse {
  status: number;
  message: string;
  error: string[];
}

export interface InputStatusRequest {
  nodeId: string;
  type: string;
  command: string;
  pc: StatusPC[];
  sw: StatusSW[];
  camera: StatusCAMERA[];
}

export interface StatusGIMBAL {
  ip: string;
  preset: string;
  speed: string;
  pan: string;
  tilt: string;
  roll: string;
}

export interface StatusCAMERA {
  id: string;
  ip: string;
  subnetMask: string;
  gatewayAddr: string;
  model: string;
  fw: string;
  status: string;
  systemFrequency: string;
  video: StatusCAMERA_VIDEO | undefined;
  exposure: StatusCAMERA_EXPOSURE | undefined;
  color: StatusCAMERA_COLOR | undefined;
  lens: StatusCAMERA_LENS | undefined;
  others: StatusCAMERA_OTHERS | undefined;
}

export interface StatusCAMERA_VIDEO {
  Codec: string;
  VideoFormatMain: string;
  VideoBitrateMain: string;
}

export interface StatusCAMERA_EXPOSURE {
  WhiteBalance: string;
  Contrast: string;
  Saturation: string;
  Hue: string;
  ColorTemperature: string;
  CMOSOffsetCorrectLevel: string;
  AdjustAB: string;
  AdjustGM: string;
}

export interface StatusCAMERA_COLOR {
  Aperture: string;
  ShutterSpeed: string;
  ISO: string;
}

export interface StatusCAMERA_LENS {
  ManualFocusPosition: string;
  ZoomPosition: string;
  FocusMode: string;
  LensPower: string;
}

export interface StatusCAMERA_OTHERS {
  AutoFocusPoint: string;
  ExposureMode: string;
  AeArea: string;
  ExposureCompensation: string;
  ImageStabilizationMode: string;
  Sharpness: string;
  NoiseReduction: string;
  LuminanceLevel: string;
}

export interface StatusSW {
  ip: string;
  name: string;
  status: string;
}

export interface StatusPC {
  mac: string;
  ip: string;
  usage: StatusPC_USAGE | undefined;
  storage: StatusPC_STORAGE[];
}

export interface StatusPC_USAGE {
  cpu: string;
  mem: string;
  gpu: string;
}

export interface StatusPC_STORAGE {
  partition: string;
  total: string;
  used: string;
  free: string;
  percent: string;
}

export interface DATA {
  fdition: string;
}

export interface InitBasicResponse {
  status: number;
  message: string;
  data: DATA | undefined;
  error: string[];
}

export interface Location {
  lat: string;
  long: string;
}

export interface PC {
  id: string;
  ip: string;
  os: string;
  gpu: string;
  gpuDriver: string;
}

export interface SW {
  ip: string;
  name: string;
  ver: string;
}

export interface CAMERA {
  id: string;
  ip: string;
  model: string;
  fw: string;
}

export interface SWITCH {
  id: string;
  ip: string;
  brand: string;
  model: string;
}

export interface InitBasicRequest {
  nodeId: string;
  type: string;
  command: string;
  location: Location | undefined;
  pc: PC[];
  sw: SW[];
  camera: CAMERA[];
  gimbal: string[];
  switch: SWITCH[];
}

export const FDITION_PACKAGE_NAME = "fdition";

export interface FditionServiceClient {
  initBasic(request: InitBasicRequest): Observable<InitBasicResponse>;

  initStatus(request: InputStatusRequest): Observable<InputStatusResponse>;
}

export interface FditionServiceController {
  initBasic(request: InitBasicRequest): Promise<InitBasicResponse> | Observable<InitBasicResponse> | InitBasicResponse;

  initStatus(
    request: InputStatusRequest,
  ): Promise<InputStatusResponse> | Observable<InputStatusResponse> | InputStatusResponse;
}

export function FditionServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["initBasic", "initStatus"];
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
