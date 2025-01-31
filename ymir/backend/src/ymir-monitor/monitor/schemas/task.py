import os
from enum import IntEnum
from typing import Dict, List, Optional

from pydantic import BaseModel, validator

from common_utils.percent_log_util import PercentResult


class MonitorType(IntEnum):
    PERCENT = 1


class TaskParameter(BaseModel):
    task_id: str
    user_id: str
    monitor_type: MonitorType = MonitorType.PERCENT
    log_paths: List[str]
    description: Optional[str]

    @validator("log_paths", each_item=True)
    def check_files(cls, log_path: str) -> str:
        if not os.path.exists(log_path):
            raise ValueError(f"log_path not exists {log_path}")

        return log_path


class TaskExtraInfo(BaseModel):
    user_id: Optional[str] = None
    monitor_type: MonitorType = MonitorType.PERCENT
    log_paths: List[str]
    description: Optional[str]


class TaskStorageStructure(BaseModel):
    raw_log_contents: Dict[str, PercentResult]
    task_extra_info: TaskExtraInfo
    percent_result: PercentResult


class TaskSetStorageStructure(BaseModel):
    __root__: Dict[str, TaskStorageStructure]

    def dict(self) -> Dict:  # type: ignore
        return super().dict()["__root__"]
